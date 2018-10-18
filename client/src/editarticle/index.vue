<template>
    <div class="article-edit-page" ref="articleEditContent">
        <div class="article-filter">
            <el-row :gutter="20" style="margin-bottom: 24px">
                <el-col :span="6">
                    <el-input v-model="articleId" :disabled="!!articleSort" placeholder="请输入查询ID"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-select v-model="articleSort" :disabled="!!articleId" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="handleSearch()" plain>查询</el-button>
                </el-col>
            </el-row>
            <el-table
                :data="articleList"
                border
                style="width: 100%">
                <el-table-column
                prop="title"
                label="标题">
                </el-table-column>
                <el-table-column
                prop="sort"
                label="分类">
                </el-table-column>
                <el-table-column
                prop="tag"
                label="标签">
                </el-table-column>
                <el-table-column
                prop="overview"
                show-overflow-tooltip
                label="概述">
                </el-table-column>
                <el-table-column
                prop="time"
                label="时间"
                >
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteArticle(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="article-edit-content">
            <el-row :gutter="20" style="padding: 12px 24px;">
                <el-col :span="4" style="display: flex">
                    <span>标题：</span><el-input v-model="articleEdit.title" placeholder="输入标题"></el-input>
                </el-col>
                <el-col :span="4" style="display: flex">
                    <span>时间：</span><el-input v-model="articleEdit.time" placeholder="选择时间"></el-input>
                </el-col>
                <el-col :span="4" style="display: flex">
                    <span>标签：</span><el-input v-model="articleEdit.tag" placeholder="输入标签"></el-input>
                </el-col>
                <el-col :span="4" style="display: flex">
                    <span>分类：</span><el-select v-model="articleEdit.sort" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-checkbox class="article-creat-tag" v-model="articleCreatTag">新建markdown</el-checkbox>
            </el-row>
            <mavon-editor v-model="articleEdit.mkcontent" :value="articleEdit.mkcontent" @save="handleUpdate"/>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        name: "article-edit-page",
        data() {
            return {
                articleId: '',
                articleSort: '',
                articleList: [],
                articleCurId: '',
                articleCreatTag: false,
                articleEdit: {
                    title: '',
                    sort: '',
                    time: '',
                    tag: '',
                    mkcontent: ''
                },
                options: [
                {
                    value: '',
                    label: '请选择'
                },
                {
                    value: '日常',
                    label: '日常'
                },
                {
                    value: '记录',
                    label: '记录'
                },
                {
                    value: '宅',
                    label: '宅'
                },
                {
                    value: '探索',
                    label: '探索'
                },
                ]
            } 
        },
        apollo: {
            articleList: {
                query: gql`{
                        articleList{
                            id title time tag sort overview mkcontent
                        }
                    }`,
                update: data => {
                    console.log(data, "data");
                    return data.articleList;
                }
            }
        },
        methods: {
            handleEdit: function(lineData) {
                this.articleCurId = lineData.id + "";
                delete lineData.id;
                delete lineData.__typename;
                this.articleEdit = Object.assign({}, lineData);
            },
            handleSearch: function() {
                this.$apollo.addSmartQuery("articleList", {
                    query: gql`query articleMessage($id: String, $sort: String){
                        article(id: $id, sort: $sort){
                            id title time tag sort overview mkcontent
                        }
                    }`,
                    variables: {
                        id: !this.articleCreatTag ? this.articleId : '',
                        sort: this.articleSort
                    },
                    update: data => {
                        let articlelist = data.article;
                        return articlelist;
                    }
                });
            },
            handleUpdate: function(value, render) {
                this.articleEdit.overview = this.articleEdit.mkcontent.substring(0, 300);
                this.$apollo.mutate({
                    mutation: gql`mutation ($id: String, $articleInput: ArticleInput, $type: String!){
                        updateArticle(id: $id, articleInput: $articleInput, type: $type) {
                            code message
                        }
                    }`,
                    variables: {
                        id: !this.articleCreatTag ? this.articleCurId : new Date().valueOf()+"",
                        articleInput: this.articleEdit ,
                        type: this.articleCreatTag ? "insert" : "update"
                    }
                }).then(rs => {
                    if(rs.data.updateArticle.code === 1) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        // 该方法也是一个promise所以需要return 不然会有警告
                        return this.$apollo.queries.articleList.refetch();
                    }
                }).catch(erro => {
                    console.log(erro);
                });
            },
            deleteArticle: function(id) {
                 this.$apollo.mutate({
                    mutation: gql`mutation ($id: String!){
                        delArticle(id: $id) {
                            code message
                        }
                    }`,
                    variables: {
                        id
                    }
                }).then(rs => {
                    if(rs.data.delArticle.code === 1) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        // 该方法也是一个promise所以需要return 不然会有警告
                        return this.$apollo.queries.articleList.refetch();
                    }
                }).catch(erro => {
                    console.log(erro);
                });
            }
        },
        components: {
            "mavon-editor": mavonEditor
        },
        mounted() {
            let vNoteLeft = document.querySelector(".v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper");
            let vNoteRight = document.querySelector(".v-note-show");
            vNoteLeft.style.maxHeight = window.innerHeight - 40 + "px";
            vNoteLeft.style.minHeight = window.innerHeight - 40 + "px";
            vNoteRight.style.maxHeight = window.innerHeight - 40 + "px";
            vNoteRight.style.minHeight = window.innerHeight - 40 + "px";
        }
    }
</script>



