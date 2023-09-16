import { WriterInfo } from "../writer/WriterInfo";

export interface BlogUpdateDto {
    title? :string;
    content?: string;
    writer?: WriterInfo;
}