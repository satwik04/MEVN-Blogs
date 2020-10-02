<template>
  <div>
    <h2
      class="text-center py-3 mb-2 uppercase text-3xl font-black text-gray-800"
    >     Change PAssword
    </h2>

    <div
      class="bg-white shadow-lg rounded px-8 pt-6 pb-8 border mb-4 md:mx-auto mx-2 flex flex-col center md:w-3/4 lg:w-2/4"
    >
      <form @submit.prevent="ChangePassword">
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="epassowrd"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="password"
            type="password"
 placeholder="******************"
            v-model="password"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="confirm_password"
          >
            Confirm Password
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker"
            id="confirm_password"
            type="password"
            placeholder="******************"
            v-model="confirmPassword"
          />
        </div>
        <button
          class="bg-transparent hover:bg-gray-800 uppercase w-full text-gray-900 hover:text-white font-bold py-2 px-4 rounded border border-gray-600"
        >
          Change Password 
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
  name: "ChangePassword",
  data() {
    return {
      feedback: null,
      password : null,
      confirmPassword : null,
      token: this.$route.params.token,
      userId : null,
      resetTokenValidity : 'checking',
    };
  },
  methods: {
    async ChangePassword(){
      if(this.confirmPassword && this.password){
        this.feedback = null;
        console.log(this.password, this.passwordToken, this.userId)
        let res = await authService.ChangePassword(this.password, this.passwordToken, this.userId);

        this.$router.push('/')
      }
      else{
        this.feedback = 'Fill the required fields'
      }
    }
},
  async created() {
    let res = await authService.VerifyToken(this.token);
    this.userId = res.data;
    resetTokenValidity = 'valid'
    console.log('sucess')
  },
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