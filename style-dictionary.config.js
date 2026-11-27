import StyleDictionary from 'style-dictionary';

const SD_META = new Set(['filePath', 'isSource']);

/**
 * SD treats a node with $value as a leaf and drops nested siblings
 * (hover, active, …). Lift the default into $root so the parent becomes
 * a group; name/kebab already strips a trailing $root segment.
 */
function liftDefaultsToRoot(dict) {
  function walk(node) {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    const childKeys = Object.keys(node).filter((k) => !k.startsWith('$'));
    if ('$value' in node && childKeys.length > 0) {
      node.$root = {
        $value: node.$value,
        ...(node.$type ? { $type: node.$type } : {}),
        ...(node.$description ? { $description: node.$description } : {}),
      };
      delete node.$value;
      delete node.$description;
    }
    for (const k of childKeys) walk(node[k]);
  }
  walk(dict);
  return dict;
}

/** Paths that have a $root child (e.g. color.border.primary). */
function collectRootParents(dict, path = [], out = new Set()) {
  if (!dict || typeof dict !== 'object' || Array.isArray(dict)) return out;
  for (const [k, v] of Object.entries(dict)) {
    if (k === '$root') {
      out.add(path.join('.'));
      continue;
    }
    if (k.startsWith('$') || SD_META.has(k)) continue;
    collectRootParents(v, [...path, k], out);
  }
  return out;
}

function rewriteRefs(value, rootParents) {
  if (typeof value === 'string') {
    return value.replace(/\{([^{}]+)\}/g, (match, ref) => {
      const clean = ref.trim();
      return rootParents.has(clean) ? `{${clean}.$root}` : match;
    });
  }
  if (Array.isArray(value)) return value.map((v) => rewriteRefs(v, rootParents));
  if (value && typeof value === 'object') {
    const next = {};
    for (const [k, v] of Object.entries(value)) {
      next[k] = rewriteRefs(v, rootParents);
    }
    return next;
  }
  return value;
}

/** After lift, {color.border.primary} must point at color.border.primary.$root. */
function rewriteRootReferences(dict) {
  const rootParents = collectRootParents(dict);
  function walk(node) {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    if ('$value' in node) {
      node.$value = rewriteRefs(node.$value, rootParents);
    }
    for (const [k, v] of Object.entries(node)) {
      if (SD_META.has(k)) continue;
      if (k.startsWith('$') && k !== '$root') continue;
      walk(v);
    }
  }
  walk(dict);
  return dict;
}

const shared = {
  usesDtcg: true,
  parsers: ['lift-defaults-to-root'],
  preprocessors: ['rewrite-root-references'],
  hooks: {
    parsers: {
      'lift-defaults-to-root': {
        pattern: /\.json$/,
        parser: ({ contents }) => liftDefaultsToRoot(JSON.parse(contents)),
      },
    },
    preprocessors: {
      'rewrite-root-references': rewriteRootReferences,
    },
  },
};

const cssPlatform = {
  transformGroup: 'css',
  buildPath: 'src/styles/',
};

const base = new StyleDictionary({
  ...shared,
  source: [
    'tokens/core/**/*.json',
    'tokens/semantic/**/*.json',
    'tokens/composite/**/*.json',
  ],
  platforms: {
    css: {
      ...cssPlatform,
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
});

// Core is included only so dark aliases like {color.gray.900} resolve.
// Filter keeps core out of the output — those vars already live in tokens.css.
const dark = new StyleDictionary({
  ...shared,
  include: ['tokens/core/**/*.json'],
  source: ['tokens/theme/dark/**/*.json'],
  platforms: {
    css: {
      ...cssPlatform,
      files: [
        {
          destination: 'tokens.dark.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('theme/dark'),
          options: {
            outputReferences: true,
            selector: '[data-theme="dark"]',
          },
        },
      ],
    },
  },
});

await base.buildAllPlatforms();
await dark.buildAllPlatforms();
