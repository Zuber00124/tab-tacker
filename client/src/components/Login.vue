<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pr-2 pb-2">

          <v-text-field
            label="Email"
            v-model="email" 
          ></v-text-field>

          <br>
          <v-text-field
            label="Password"            
            type="password"
            name="password"
            v-model="password"
          ></v-text-field>

          <br>

          <div class="error" v-html="error" />

          <v-btn
            @click="login"  class="cyan">
            Login
          </v-btn>
        </div>
      </div> 
    </v-flex>  
  </v-layout>  

</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'hello',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color: red;
  }
</style>
