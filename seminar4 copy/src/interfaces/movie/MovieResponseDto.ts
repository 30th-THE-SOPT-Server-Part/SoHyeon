import mongoose from "mongoose";
import { MovieCreateDto } from "./MovieCreateDto";

export interface MovieResponseDto {
    title: string;
    director: string;
    startDate: Date;
    story: string;
}