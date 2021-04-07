import { IPost } from '@sinbix/demo/shared/utils/post';

export interface PostDialogFormData {
  titleForm: string;
  post?: Partial<IPost>;
}
