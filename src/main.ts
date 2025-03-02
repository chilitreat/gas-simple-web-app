import { doGet } from './doGet';
import { doPost } from './doPost';

// Variables to be referenced from GAS need to be passed to the global object.
(global as any).doGet = doGet;
(global as any).doPost = doPost;
