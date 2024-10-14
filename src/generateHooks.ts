import fs from 'fs';
import path from 'path';

// تعريف الواجهات لتطابق بنية JSON من Postman
interface PostmanRequest {
    method: string;
    url: {
        raw: string;
    };
    // يمكن إضافة خصائص أخرى إذا لزم الأمر
}

interface PostmanItem {
    name: string;
    request?: PostmanRequest; // جعلها اختيارية للتعامل مع العناصر التي قد لا تحتوي على request
    item?: PostmanItem[]; // للتعامل مع العناصر المتداخلة
}

interface PostmanCollection {
    item: PostmanItem[];
    // يمكن إضافة خصائص أخرى إذا لزم الأمر
}

// دالة لتوليد الهوكات بناءً على مجموعة Postman
const generateHooks = (collection: PostmanCollection) => {
    let hooks = '';

    // دالة لمعالجة العناصر بشكل متكرر (recursive) للتعامل مع العناصر المتداخلة
    const processItems = (items: PostmanItem[]) => {
        items.forEach((endpoint: PostmanItem) => {
            if (endpoint.request) {
                const method = endpoint.request.method;
                const url = endpoint.request.url.raw;
                const name = endpoint.name.replace(/\s+/g, '');
                const hookName = `use${name}${method}Query`;

                hooks += `export const ${hookName} = createAPIHook('${method}', '${url}', '${name.toLowerCase()}');\n`;
            }

            // إذا كان هناك عناصر متداخلة، نقوم بمعالجتها أيضًا
            if (endpoint.item) {
                processItems(endpoint.item);
            }
        });
    };

    // بدء معالجة العناصر من جذر المجموعة
    processItems(collection.item);

    // كتابة الهوكات المولدة إلى ملف
    fs.writeFileSync(path.join(__dirname, 'src/hooks/apiHooks.ts'), hooks);
};

// قراءة ملف Postman Collection JSON
const postmanCollection = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'Tawsella.postman_collection.json'), 'utf-8')
);

// توليد الهوكات بناءً على المجموعة
generateHooks(postmanCollection);

console.log('API hooks have been generated successfully.');
