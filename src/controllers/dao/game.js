import { GamesStore, Insert, Select, Update } from "../../db";
import { ValidationError } from "../error";
import LookUp from "../lookup/lookup";
import { Boards } from "./boards";

export class Game {
    constructor() {
        this.board = new Boards();
    }

    async addStoryToGame(document) {
        let check = await new LookUp().isStoryInGame(document['board'], document['story']);

        if (check.length) {
            let validationError = new ValidationError();
            validationError.forUniqueKeyValidation([document['board'], document['story']]);
            throw validationError;
        }

        return await new Insert(GamesStore).addDocument(document).execute();
    }

    async start(document) {
        try {
            let board = await this.board.create(document);

            if (board['session_id']) {
                return 'Created Board';
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async deals() {
        return new Select(GamesStore).execute();
    }

    async showdown(id, document) {
        return await new Update(GamesStore).updateById(id).addDocument(document).execute();
    }
}