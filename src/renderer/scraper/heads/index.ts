import r from "../request";
import { IToolHead } from "@types";
import tmdb from "./tmdb";
import javbus from "./javbus";
import avsox from "./avsox";
import javbusUncensored from "./javbus_uncensored";

const heads: IToolHead[] = [tmdb(r), avsox(r), javbus(r), javbusUncensored(r)];
export default heads;
