'use server'
import PocketBase, {ListResult, RecordListOptions, RecordOptions} from 'pocketbase';
import {ECollections} from "@/lib/types";

const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

export interface ICreate<T> {
    collection: ECollections,
    data: T
}

export interface IUpdate<T> {
    collection: ECollections,
    id: string,
    data: T
}

export interface IDelete {
    collection: ECollections,
    id: string
}

export interface IList {
    collection: ECollections,
    page?: number,
    perPage?:number,
    options?: RecordListOptions
}

export interface IGet {
    collection: ECollections,
    id: string,
    options?: RecordOptions
}

export const login = ({email, password}:{email: string, password: string}) => pb.collection('users').authWithPassword(email, password)
export const create = <T extends object>({collection, data}:ICreate<T>) => pb.collection(collection).create(data).then(e=>({data: e}));
export const update = <T extends object>({collection, id, data}:IUpdate<T>) => pb.collection(collection).update(id, data).then(e=>({data: e}));
export const safeDelete = <T extends object>({collection, id}:IDelete) => pb.collection(collection).delete(id)
export const list = <T extends object>({collection, options, perPage, page}:IList):Promise<ListResult<T>> => pb.collection(collection).getList(page || 1, perPage || 10, options);
export const get = <T extends object>({collection, options, id}:IGet):Promise<T> => pb.collection(collection).getOne(id, options);
