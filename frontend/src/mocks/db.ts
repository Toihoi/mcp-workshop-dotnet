import { mockUsers } from './data/users';
import { mockProjects } from './data/projects';
import { mockStatuses } from './data/statuses';
import { mockTags } from './data/tags';
import { mockTasks } from './data/tasks';
import { mockComments } from './data/comments';
import { mockNotifications } from './data/notifications';
import { mockTemplates } from './data/templates';
import { mockWikiPages } from './data/wikiPages';

// Deep clone to allow runtime modifications
export const db = {
  users: structuredClone(mockUsers),
  projects: structuredClone(mockProjects),
  statuses: structuredClone(mockStatuses),
  tags: structuredClone(mockTags),
  tasks: structuredClone(mockTasks),
  comments: structuredClone(mockComments),
  notifications: structuredClone(mockNotifications),
  templates: structuredClone(mockTemplates),
  wikiPages: structuredClone(mockWikiPages),
};

// ID sequence helpers
let taskSeq = Math.max(...db.tasks.map(t => t.id), 0);
export const nextTaskId = () => ++taskSeq;

let commentSeq = Math.max(...db.comments.map(c => c.id), 0);
export const nextCommentId = () => ++commentSeq;

let notificationSeq = Math.max(...db.notifications.map(n => n.id), 0);
export const nextNotificationId = () => ++notificationSeq;

let wikiSeq = Math.max(...db.wikiPages.map(w => w.id), 0);
export const nextWikiId = () => ++wikiSeq;

let projectSeq = Math.max(...db.projects.map(p => p.id), 0);
export const nextProjectId = () => ++projectSeq;

let tagSeq = Math.max(...db.tags.map(t => t.id), 0);
export const nextTagId = () => ++tagSeq;

let statusSeq = Math.max(...db.statuses.map(s => s.id), 0);
export const nextStatusId = () => ++statusSeq;
