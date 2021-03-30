import { IPost } from '@sinbix/demo/apps/shared/types';

export interface PostDialogFormData {
  titleForm: string;
  post?: Partial<IPost>;
}
