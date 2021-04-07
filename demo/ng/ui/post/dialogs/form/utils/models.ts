import { IPost } from '@sinbix/demo/shared/types/post';

export interface PostDialogFormData {
  titleForm: string;
  post?: Partial<IPost>;
}
