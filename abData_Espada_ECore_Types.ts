import { DataScheme } from "ab-data";
import { abDataDefTypes as t } from "ab-data";

export function abData_Espada_ECore_Types(ds: DataScheme): DataScheme {
    ds
        /* Tables */
        .defType("FilesUpload_ApiResult_List", tpFilesUpload_ApiResult_List)
        .defType("FilesUpload_ApiResult_Upload", tpFilesUpload_ApiResult_Upload)
        .defType("FilesUpload_FileCategory", tpFilesUpload_FileCategory)
        .defType("FilesUpload_MediaCategory", tpFilesUpload_MediaCategory)
        .defType("FilesUpload_Config", tpFilesUpload_Config);

    return ds;
}

/* Files Upload */
const tpFilesUpload_ApiResult_List = t.TObjectPreset({
    files: t.TArray(t.TObjectPreset({
        fileName: "string",
        uri: "string",
    })),
});

const tpFilesUpload_ApiResult_Upload = t.TObjectPreset({
    fileInfo: t.TObjectPreset({
        fileName: "string",
        uri: "string",
    }),
});

const tpFilesUpload_FileCategory = t.TObjectPreset({
    permissions: t.TArray("string"),
    type: t.TEnum([ "file" ]),
    exts: t.TArray("string"),
    multiple: "bool",
    alias: "string",
    media: "bool",
});

const tpFilesUpload_MediaCategory = t.TObjectPreset({
    permissions: t.TArray("string"),
    type: t.TEnum([ "image" ]),
    exts: t.TArray("string"),
    compress: "bool",
    multiple: "bool",
    alias: "string",
    sizes: t.TObjectPreset({
        $default: t.TArrayPreset([ "int", "int" ]),
    }, t.TObject("string", t.TArrayPreset([ "int", "int" ]))),
});

const tpFilesUpload_Config = t.TObjectPreset({
    apiUri: "string",
    categories: t.TObject("string", [ tpFilesUpload_FileCategory, 
            tpFilesUpload_MediaCategory ]),
    uris: t.TObjectPreset({
        file: "string",
        loading: "string",
    }),
});