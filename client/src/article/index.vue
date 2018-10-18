<template>
    <div>
        <div class="article-header"></div>
        <div class="article-content">
            <!-- 
                v-model="article" 
                @change="change"-->
            <mavon-editor 
                v-model="article.mkcontent"
                :toolbarsFlag="false"
                :subfield="false"
                :defaultOpen="'preview'"
                :boxShadow="false" />
        </div>
        <div class="article-footer">
            <p>白魚 / ShiroSakana</p>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import { queryParams } from '@/tool'

    export default {
        name: "article-content",
        data() {
            return {
                article:{}
            };
        },
        apollo: {
            article: {
                query: gql`query articleMessage($id: String!){
                        article(id: $id){
                            id title time tag sort overview mkcontent
                        }
                    }`,
                variables: {
                    id: queryParams(window.location.search).id
                },
                update: data => {
                    console.log(data, "data");
                    return data.article[0];
                }
            }
        },
        components: {
            "mavon-editor": mavonEditor
        },
        methods: {
            change: rs => {
                console.log(rs);
            }
        }
    }
</script>
 