import {atom} from "jotai";
import {Image} from "state";

const imageStore = atom<Image[]>([])

export {
  imageStore
}