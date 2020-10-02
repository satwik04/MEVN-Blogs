<template>
  <div>
    <div
      class="bg-white shadow-lg rounded px-8 pt-6 pb-8 border mb-4 md:mx-10 mx-2 flex flex-col center "
    >
    <h2
      class="text-center py-3 mb-2 uppercase text-4xl font-black text-gray-800"
    v-if="this.isEditingMode">Edit Post
    </h2>
       <h2
      class="text-center py-3 mb-2 uppercase text-4xl font-black text-gray-800"
    v-else>New Post
    </h2>
      <form @submit.prevent="updatePost">
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="post_title"
          >
            Title
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="post_title"
            type="text"
            placeholder='Add Post Title Here!'
        v-model="title"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="post_content"
          >
            Content
          </label>
          <textarea
            contenteditable="contenteditable"
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker"
            placeholder="Click here and start typing"
            id="post_content"
            v-model="content"
          />
        </div>
        <button
          class="bg-transparent hover:bg-gray-800 uppercase w-full text-gray-900 hover:text-white font-bold py-2 px-4 rounded border border-gray-600"
        v-if="this.isEditingMode">
          Make Changes
        </button>
        <button
          class="bg-transparent hover:bg-gray-800 uppercase w-full text-gray-900 hover:text-white font-bold py-2 px-4 rounded border border-gray-600"
        v-else>
          Create Post
        </button>
        <div class="field center-align">
          <p v-if="feedback" class="error">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PostService from "../postServices";
export default {
  name: "EditPost",
  data() {
    return {
      feedback: null,
      title: null,
      author: "PKP",
      content: null,
      post : null
    };
  },
  props: ['id', 'isEditingMode'],
  methods: {
    async updatePost() {
      if (this.title && this.author && this.content) {
        this.feedback = null;
        if(this.isEditingMode)
          await PostService.updatePost(this.id,  this.title, this.author, this.content);
        else
          await PostService.addPost(this.title, this.author, this.content);

        this.$router.push({ name: "Home" });
      } else {
        this.feedback = "Fill the missing fields";
      }
    },

  },
  async created(){
    if (this.isEditingMode) {
        this.post = await PostService.getPostById(this.id)
        this.title = this.post.title
        this.author = this.post.author
        this.content = this.post.content
    }
  },
};
</script>


<style>
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
.edit-post {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-post h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-post .field {
  margin: 20px auto;
  position: relative;
}

</style>