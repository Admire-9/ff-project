<template>
    <div class="article-list-content" ref="articleContent">
        <div class="article-list-left">
            <div class="article-auth-header">
                <img />
                <p>白魚 / ShiroSakana</p>
                <p>{{$apollo.queries.articleList.loading}}</p>
            </div>
            <div class="article-left-other">
                <ul class="article-fast-card">
                    <li>日常</li>
                    <li>记录</li>
                    <li>宅</li>
                    <li>探索</li>
                </ul>
            </div>
        </div>
        <div class="article-list-right">
            <div class="article-list-right-bc"></div>
            <div class="article-list-items">
                <div class="article-list-item" :key="item.id" v-for="item in articleList">
                    <a class="article-title" :href="`/article?id=${item.id}`">{{item.title}}</a>
                    <div class="article-overview">{{item.overview}}</div>
                    <div class="article-footer">
                        <span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-oclock"></use>
                            </svg> {{item.time}}
                        </span>
                        <span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-sort"></use>
                            </svg> {{item.sort}}
                        </span>
                        <ul class="article-tag">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-tag"></use>
                            </svg> {{item.tag}}
                        </ul>
                    </div>
                    <div class="article-line"></div>
                </div>
                <div class="article-list-item">
                    <div class="article-title">这里是标题标题标</div>
                    <div class="article-overview">这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述</div>
                    <div class="article-footer">
                        <span>2099-99-99 23:22:00</span>
                        <span>技术</span>
                        <ul class="article-tag">这里是文章的标签标签</ul>
                    </div>
                    <div class="article-line"></div>
                </div>
                <div class="article-list-item">
                    <div class="article-title">这里是标题标题标</div>
                    <div class="article-overview">这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述</div>
                    <div class="article-footer">
                        <span>2099-99-99 23:22:00</span>
                        <span>技术</span>
                        <ul class="article-tag">这里是文章的标签标签</ul>
                    </div>
                </div>
                <div class="article-list-item">
                    <div class="article-title">这里是标题标题标</div>
                    <div class="article-overview">这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述</div>
                    <div class="article-footer">
                        <span>2099-99-99 23:22:00</span>
                        <span>技术</span>
                        <ul class="article-tag">这里是文章的标签标签</ul>
                    </div>
                </div>
                <div class="article-list-item">
                    <div class="article-title">这里是标题标题标</div>
                    <div class="article-overview">这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述</div>
                    <div class="article-footer">
                        <span>2099-99-99 23:22:00</span>
                        <span>技术</span>
                        <ul class="article-tag">这里是文章的标签标签</ul>
                    </div>
                </div>
                <div class="article-list-item">
                    <div class="article-title">这里是标题标题标</div>
                    <div class="article-overview">这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述这里是概述概述概述</div>
                    <div class="article-footer">
                        <span>2099-99-99 23:22:00</span>
                        <span>技术</span>
                        <ul class="article-tag">这里是文章的标签标签</ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getArticlelist } from "@/client/api/article";
    import gql from 'graphql-tag';
    export default {
        name: "article-list",
        data() {
            return {
                articleList: []
            };
        },
        components: {
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
            change: rs => {
                console.log(rs);
            }
        },
        mounted: function(){
            let articleContent = this.$refs.articleContent;
            articleContent.style.height = window.innerHeight + "px";
        }
    }
</script>
 