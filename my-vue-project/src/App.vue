<template>
  <div class="container">
    <div class="row">
      <div class="col-5 mx-auto m-5 ">
        <div class="position-relative"> 
          <textarea
            class="form-control p-4"
            v-model="newText.content"
            placeholder="Your text here"
            style="height: 180px;"
            rows="3"
          ></textarea>
          <button @click="submit" type="submit" class="btn btn-primary position-absolute" style="background-color: #9d53c3; bottom: 25px; right: 20px;">SUBMIT</button> 
          
        </div>
        <br/>
        <div v-for="(post, i) in posts" :key="i" class="card mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-3 ml-auto">
            <img :src="require('./assets/indir.jpeg')" class="img-thumbnail rounded-circle"  style="width: 50px; height: 50px;" />
          </div>
          <div class="col-sm-9 ">
            <small class="text-muted">{{ post.date }}</small>
        <p><strong>Jane Doe</strong> {{ post.content }}</p>
        </div>
         <div class="divider"></div>
      </div>
      <div class="row">
      <div class="col-sm-6">
        <button @click="likePost(i)" class="btn btn-sm "><i class="mdi mdi-thumb-up"></i> {{ post.likes }}</button>
        <button @click="dislikePost(post.id)" class="btn btn-sm "><i class="mdi mdi-thumb-down"></i> {{ post.dislikes }}</button>
      </div>
      <div class="col-sm-6 ml-auto">
        
        <button @click="editPost(post.id)" class="btn btn-sm "><i class="mdi mdi-pencil"></i></button>
        <button @click="deletePost(post.id)" class="btn btn-sm "> <i class="mdi mdi-delete"></i> </button>
      </div>
    </div>
    </div>
      </div>
      </div>
      </div>
    </div>
   
   
 
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      newText: {
        content: '',
      },
      posts: [],
    };
  },
  methods: {
    submit() {
      const newText = {
        id: Date.now(),
        content: this.newText.content,
        image: 'https://example.com/your-image.jpg',
        likes: 0,
        dislikes: 0,
        date: new Date().toLocaleString(),
      };

      this.posts.unshift(newText);
      this.saveToLocalStorage();
      this.newText = {
        content: '',
      };
    },
    editPost(id) {
      const postIndex = this.posts.findIndex(post => post.id === id);
      const updatedPost = prompt('Edit', this.posts[postIndex].content);

      if (updatedPost !== null) {
        this.posts[postIndex].content = updatedPost;
        this.saveToLocalStorage();""
      }
    },
    deletePost(id) {
      const confirmDelete = confirm('Are you sure want to delete this post?');

      if (confirmDelete) {
        this.posts = this.posts.filter(post => post.id !== id);
        this.saveToLocalStorage();
      }
    },
    likePost(i) {
      this.posts[i].likes++;
      this.saveToLocalStorage();
    },
    dislikePost(id) {
      const postIndex = this.posts.findIndex(post => post.id === id);
      this.posts[postIndex].dislikes++;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('posts', JSON.stringify(this.posts));
    },
  },
  mounted() {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      this.posts = JSON.parse(storedPosts);
    }
  },
};
</script>

<style scoped>
.divider{

  border-bottom: 1px solid gray; 
  margin-bottom: 1px; 

}
</style>
