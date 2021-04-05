import { IPost } from '@sinbix/demo/shared/types';

export interface PostDialogFormData {
  titleForm: string;
  post?: Partial<IPost>;
}
