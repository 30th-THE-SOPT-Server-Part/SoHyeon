import mongoose from "mongoose";

export interface MovieCreateDto {
    title: string;
    director: string;
    thumbnail: string;
    story: string;
}