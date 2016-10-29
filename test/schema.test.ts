import {assert} from "chai";
import {version as TypescriptVersion, CompilerOptions} from "typescript";
import {TJS} from "../typescript-json-schema";
import {readFileSync, writeFileSync} from 'fs';
import {resolve} from 'path';

const base = "test/programs/";

export function assertSchema(group: string, name: string, type: string, settings?: any, compilerOptions?: CompilerOptions, schemaFile?: string = 'schema.json') {
    it(group + " should create correct schema", function() {
        if(!settings) {
            settings = TJS.getDefaultArgs();
            settings.generateRequired = true;
        }

        const baseGroup = base + group + '/';
        const actual = TJS.generateSchema(TJS.getProgramFromFiles([resolve(baseGroup + name)], compilerOptions), type, settings);

        //writeFileSync(`./${baseGroup}${schemaFile}`, JSON.stringify(actual, null, 4));

        const file = readFileSync(baseGroup + schemaFile, "utf8")
        const expected = JSON.parse(file);

        assert.isObject(actual);
        assert.deepEqual(actual, expected);
    });
}

describe("schema", function () {
    assertSchema("array-and-description", "main.ts", "MyObject");
    assertSchema("class-single", "main.ts", "MyObject");

    assertSchema("interface-single", "main.ts", "MyObject");
    assertSchema("interface-multi", "main.ts", "MyObject");

    let settings = TJS.getDefaultArgs();
    settings.useRootRef = true;
    assertSchema("interface-recursion", "main.ts", "MyObject", settings); // this sample needs rootRef

    assertSchema("module-interface-single", "main.ts", "MyObject");

    // not supported right now
    //assertSchema("module-interface-deep", "main.ts", "Def");

    assertSchema("enums-string", "main.ts", "MyObject");
    assertSchema("enums-number", "main.ts", "MyObject");
    assertSchema("enums-number-initialized", "main.ts", "Enum");
    assertSchema("enums-compiled-compute", "main.ts", "Enum");
    assertSchema("enums-mixed", "main.ts", "MyObject");
    assertSchema("string-literals", "main.ts", "MyObject");
    assertSchema("string-literals-inline", "main.ts", "MyObject");

    assertSchema("array-types", "main.ts", "MyArray");
    assertSchema("map-types", "main.ts", "MyObject");

    assertSchema("namespace", "main.ts", "Type");

    assertSchema("type-union", "main.ts", "MyObject");
    assertSchema("type-intersection", "main.ts", "MyObject");

    assertSchema("type-aliases", "main.ts", "MyString");
    assertSchema("type-aliases-fixed-size-array", "main.ts", "MyFixedSizeArray");
    assertSchema("type-aliases-multitype-array", "main.ts", "MyArray");
    assertSchema("type-anonymous", "main.ts", "MyObject");
    assertSchema("type-primitives", "main.ts", "MyObject");
    assertSchema("type-nullable", "main.ts", "MyObject");

    assertSchema("optionals", "main.ts", "MyObject");

    assertSchema("comments", "main.ts", "MyObject");
    assertSchema("comments-override", "main.ts", "MyObject");

    assertSchema("type-union-tagged", "main.ts", "Shape");

    describe('comments-override-types', () => {

      assertSchema("comments-override-types", "tuple.ts", "MyObject", null, null, "tuple.json");
      assertSchema("comments-override-types", "tuple.ts", "Tuple", null, null, "tuple-direct.json");

    });

    assertSchema("strict-null-checks", "main.ts", "MyObject", undefined, {
        strictNullChecks: true
    });
});
