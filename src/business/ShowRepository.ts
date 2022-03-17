import { Show } from "../model/Show";

export interface ShowRepository{
    insert(show: Show): Promise<Show>
    getAllShows(): Promise<Show | null>
}