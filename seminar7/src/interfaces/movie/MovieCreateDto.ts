import mongoose from "mongoose";

export interface MovieCreateDto {
    title: string;
    director: string;
    startDate?: string
    thumbnail?: string;
    story?: string;
}