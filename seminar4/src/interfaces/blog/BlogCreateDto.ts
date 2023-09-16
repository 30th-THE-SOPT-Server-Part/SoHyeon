import { WriterInfo } from "../writer/WriterInfo";


export interface BlogCreateDto {
    title: string;
    content: string;
    writer: WriterInfo
}