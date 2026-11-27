import type { ComponentType, SVGProps } from 'react';

import { Alert } from './Alert';
import { ArrowDown } from './ArrowDown';
import { ArrowLeft } from './ArrowLeft';
import { ArrowRight } from './ArrowRight';
import { ArrowUp } from './ArrowUp';
import { Bell } from './Bell';
import { Calendar } from './Calendar';
import { Check } from './Check';
import { ChevronDown } from './ChevronDown';
import { ChevronLeft } from './ChevronLeft';
import { ChevronRight } from './ChevronRight';
import { ChevronUp } from './ChevronUp';
import { Close } from './Close';
import { Columns } from './Columns';
import { Command } from './Command';
import { Copy } from './Copy';
import { Download } from './Download';
import { Edit } from './Edit';
import { ExternalLink } from './ExternalLink';
import { EyeOff } from './EyeOff';
import { Eye } from './Eye';
import { Filter } from './Filter';
import { FolderClosed } from './FolderClosed';
import { FolderOpen } from './FolderOpen';
import { Grid } from './Grid';
import { HandleHor } from './HandleHor';
import { HandleVer } from './HandleVer';
import { Home } from './Home';
import { Info } from './Info';
import { Link } from './Link';
import { Lock } from './Lock';
import { Mail } from './Mail';
import { Menu } from './Menu';
import { Minus } from './Minus';
import { More } from './More';
import { Plus } from './Plus';
import { Redo } from './Redo';
import { Rows } from './Rows';
import { Search } from './Search';
import { Settings } from './Settings';
import { Share } from './Share';
import { SortDown } from './SortDown';
import { SortUp } from './SortUp';
import { Sparkles } from './Sparkles';
import { Trash } from './Trash';
import { Undo } from './Undo';
import { Upload } from './Upload';
import { User } from './User';

export type IconName =
  | 'alert'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'bell'
  | 'calendar'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'close'
  | 'columns'
  | 'command'
  | 'copy'
  | 'download'
  | 'edit'
  | 'external-link'
  | 'eye-off'
  | 'eye'
  | 'filter'
  | 'folder-closed'
  | 'folder-open'
  | 'grid'
  | 'handle-hor'
  | 'handle-ver'
  | 'home'
  | 'info'
  | 'link'
  | 'lock'
  | 'mail'
  | 'menu'
  | 'minus'
  | 'more'
  | 'plus'
  | 'redo'
  | 'rows'
  | 'search'
  | 'settings'
  | 'share'
  | 'sort-down'
  | 'sort-up'
  | 'sparkles'
  | 'trash'
  | 'undo'
  | 'upload'
  | 'user';

/** Alias kept for Button and other component APIs */
export type ButtonIconName = IconName;

export const icons: Record<
  IconName,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  'alert': Alert,
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'bell': Bell,
  'calendar': Calendar,
  'check': Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'close': Close,
  'columns': Columns,
  'command': Command,
  'copy': Copy,
  'download': Download,
  'edit': Edit,
  'external-link': ExternalLink,
  'eye-off': EyeOff,
  'eye': Eye,
  'filter': Filter,
  'folder-closed': FolderClosed,
  'folder-open': FolderOpen,
  'grid': Grid,
  'handle-hor': HandleHor,
  'handle-ver': HandleVer,
  'home': Home,
  'info': Info,
  'link': Link,
  'lock': Lock,
  'mail': Mail,
  'menu': Menu,
  'minus': Minus,
  'more': More,
  'plus': Plus,
  'redo': Redo,
  'rows': Rows,
  'search': Search,
  'settings': Settings,
  'share': Share,
  'sort-down': SortDown,
  'sort-up': SortUp,
  'sparkles': Sparkles,
  'trash': Trash,
  'undo': Undo,
  'upload': Upload,
  'user': User,
};

/** Alias used by Button and other components */
export const buttonIcons = icons;

export const iconNames = Object.keys(icons) as IconName[];

export { Alert, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Bell, Calendar, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Close, Columns, Command, Copy, Download, Edit, ExternalLink, EyeOff, Eye, Filter, FolderClosed, FolderOpen, Grid, HandleHor, HandleVer, Home, Info, Link, Lock, Mail, Menu, Minus, More, Plus, Redo, Rows, Search, Settings, Share, SortDown, SortUp, Sparkles, Trash, Undo, Upload, User };
