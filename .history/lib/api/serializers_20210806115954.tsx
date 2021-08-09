import superjson from 'superjson';
import { MinimisedTree, ReferentialEqualityAnnotations } from 'superjson/dist/plainer';
import { TypeAnnotation } from 'superjson/dist/transformer';
import { JSONValue } from 'superjson/dist/types';

interface IMetaProps {
    values?: MinimisedTree<TypeAnnotation>;
    referentialEqualities?: ReferentialEqualityAnnotations;
}

interface ISerializerProps {
    json?: JSONValue;
    meta?: IMetaProps
}

export const serialized = (object: any) => {
    return JSON.stringify({ ...object}); 
}

export const deserialize = (serializedObj: JSONValue) => {
    return JSON.parse(json);
}

export const serializeAndStringify = (object: any) => {
    // const jsonString: string = superjson.stringify(object); 
    JSON.stringify({ ...object}); 
    return; 
    // return jsonString;
}

export const parseAndDeserialize = (jsonString: string) => {
    // const originalObject: any = superjson.parse(jsonString);
    // return originalObject;
    return JSON.parse({ ...jsonString}); 
}