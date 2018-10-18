<template>
    <div id="HomeContent" class="home-page-content">
        <canvas id="granim-canvas" class="granim-canvas">
        </canvas>
        <div class="nav">
            <a class="nav-item">Index</a>
            <a class="nav-item" href="/article">Blog</a>
            <a class="nav-item">Gate</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home-page",
        data() {
            return {

            } 
        },
        mounted() {
            var granimInstance = new Granim({
                element: '#granim-canvas',
                name: 'granim',
                opacity: [1, 1],
                direction: "top-bottom",
                stateTransitionSpeed: 5000,
                states : {
                    "default-state": {
                        gradients: [
                            ['#834D9B', '#D04ED6'],
                            ['#1CD8D2', '#93EDC7']
                        ]
                    }
                }
            });
        }
    }
</script>