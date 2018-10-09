<template>
    <div>
        <div class="article-header"></div>
        <div class="article-content">
            <mavon-editor 
                v-model="value"
                :toolbarsFlag="false"
                :subfield="false"
                :defaultOpen="'preview'"
                :boxShadow="false"
                @change="change" />
        </div>
        <div class="article-footer">
            <p>白魚 / ShiroSakana</p>
        </div>
    </div>
</template>

<script>

    import test from '../../components/test'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: "article-content",
        data() {
            return {
                value: `# js的Object（对象）
---
### 1、一个简单的对象
最开始常使用的方式`
            };
        },
        components: {
            test,
            "mavon-editor": mavonEditor
        },
        methods: {
            change: rs => {
                console.log(rs);
            }
        }
    }
</script>
 