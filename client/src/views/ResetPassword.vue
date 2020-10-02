<template>
  <div>
    <h2
      class="text-center py-3 mb-2 uppercase text-3xl font-black text-gray-800"
    >      Reset Password
    </h2>

    <div
      class="bg-white shadow-lg rounded px-8 pt-6 pb-8 border mb-4 md:mx-auto mx-2 flex flex-col center md:w-3/4 lg:w-2/4"
    >
      <form @submit.prevent="ResetPassword">
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="email"
            type="email"
            placeholder="example@test.com"
            v-model="email"
          />
        </div>
        <button
          class="bg-transparent hover:bg-gray-800 uppercase w-full text-gray-900 hover:text-white font-bold py-2 px-4 rounded border border-gray-600"
        >
         Submit
        </button>
        <div class="field center-align">
          <p v-if="feedback" class="error">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import authService from "../authServices";
export default {
  name: "ResetPassword",
  data() {
    return {
      feedback: null,
      email : null,
    };
  },
  methods: {
    async ResetPassword(){
      if(this.email){
        this.feedback = null;
        let res = await authService.ResetPassword(this.email);
        this.$router.push('/')
      }
      else{
        this.feedback = 'Fill the required fields'
      }
    }
}
}
</script>


<style>
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

</style>