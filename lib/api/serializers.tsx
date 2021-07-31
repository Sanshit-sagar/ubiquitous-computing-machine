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
    const serializedData: ISerializerProps = superjson.serialize(object);
    return {...serializedData}; 
}

export const deserialize = (json: JSONValue, meta: IMetaProps) => {
    const deserializedData: any = superjson.deserialize({ json, meta });
    return deserializedData;
}

export const serializeAndStringify = (object: any) => {
    const jsonString: string = superjson.stringify(object); 
    return jsonString;
}

export const parseAndDeserialize = (jsonString: string) => {
    const originalObject: any = superjson.parse(jsonString);
    return originalObject;
}