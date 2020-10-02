<template>
<div>
  <div v-if="isLoading">
   <loader object="#212121" color1="#9e9e9e" color2="#424242" size="5" speed="1.2" bg="#343a40" objectbg="#999793" opacity="0" name="circular"></loader>>
  </div>
  <div v-else class="mx-2 md:mx-auto md:w-3/4 max-w-full">
    <div>
    <div class="title text-center text-3xl mb-10 break-words">
      {{post.title}}
    </div>
        <div class="flex items-center mb-4 justify-center">
          <img
            class="w-10 h-10 rounded-full mr-4"
            src="https://api.adorable.io/avatars/hello.png"
            alt="Avatar"
          />
          <div class="text-sm">
            <p class="text-gray-900 leading-none">{{post.authorName}}</p>
          </div>
        </div>
        <div class="flex items-center mb-10 justify-center ">
          <div class="text-sm">
            <p class="text-gray-900 leading-none">{{post.createdAt}}</p>
          </div>
        </div>
    <div class="mx-2 text-left mt-5" >
      {{post.content}}
    </div>
    </div>
  </div>
</div>
</template>

<script>
import PostService from "../postServices";
import moment from 'moment';
export default {
  name: "ViewPost",
  props: ["id"],
  data() {
    return {
      post: null,
      isLoading : true
    };
  },
  async created() {
    this.post = await PostService.getPostById(this.id);
    this.isLoading = false
  },
};
</script>

<style>
</style>