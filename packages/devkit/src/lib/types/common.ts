export interface BaseProjectSchema {
  name: string;
  tags?: string;
}

export interface BaseProjectTsLibSchema extends BaseProjectSchema {
  importPath?: string;
}
