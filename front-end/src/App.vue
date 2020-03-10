<template>
  <div class="container">
    <div class="row vertical-centre justify-content-center mt-50">
      <div class="col-md-6 mx-auto">
        <!-- CreateTodo -->
        <div class="col align-self-center">
          <h3 class="pb-2 text-left">
            Things to do
          </h3>

          <form @submit.prevent>
            <div class="form-group stretch-to-full">
              <input
                type="text"
                class="form-control"
                @keypress="typing=true"
                placeholder="What do you want to do?"
                v-model="name"
                @keyup.enter="addTodo($event)"
              />
              <small class="form-text text-muted" v-show="typing">Hit enter to save</small>
            </div>
          </form>
        </div>
        <!-- /CreateTodo -->

        <!-- TodoList -->
        <div v-bind:show="todos.length>0" class="col align-self-center">
          <div class="form-row align-items-center" v-for="todo in todos" :key="todo._id">
            <div class="col-auto my-1 flex-grow-1">
              <div class="input-group mb-3 stretch-to-full">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <input
                      type="checkbox"
                      v-model="todo.done"
                      :checked="todo.done"
                      :value="todo.done"
                      v-on:change="updateTodo(todo)"
                      title="Mark as done?"
                    />
                  </span>
                </div>

                <input
                  type="text"
                  class="form-control"
                  :class="todo.done?'is-done':''"
                  v-model="todo.name"
                  @keypress="todo.editing=true"
                  @keyup.enter="updateTodo(todo)"
                />

                <div class="input-group-append">
                  <div class="input-group-text">
                    <span
                      class="input-group-addon addon-left"
                      title="Delete todo?"
                      v-on:click="deleteTodo(todo._id)"
                    >
                      X
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="alert alert-primary stretch-to-full"
            v-show="todos.length==0"
          >Nothing to do</div>
        </div>
        <!-- /TodoList -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      name: '',
      typing: false,
      todos: [],
    };
  },
  created() {
    this.fetchTodo();
  },
  methods: {
    addTodo(event) {
      if (event) event.preventDefault();

      const todo = {
        name: this.name,
        done: false,
      };

      this.$http
        .post('/', todo)
        .then(() => {
          this.clearTodo();
          this.fetchTodo();
          this.typing = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateTodo(todo) {
      // eslint-disable-next-line no-underscore-dangle
      const id = todo._id;
      this.$http
        .put(`/${id}`, todo)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteTodo(id) {
      this.$http.delete(`/${id}`).then(() => {
        this.fetchTodo();
      });
    },
    clearTodo() {
      this.name = '';
    },
    fetchTodo() {
      this.$http.get('/').then((response) => {
        this.todos = response.data;
      });
    },
  },
};
</script>

<style lang="scss">
  @import "node_modules/bootstrap/scss/bootstrap";
  @import "node_modules/bootstrap-vue/src/index.scss";

  .vertical-centre {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stretch-to-full {
    width: 100%;
  }

  .is-done {
    text-decoration: line-through !important;
  }

  .flex-grow-1 {
    flex-grow: 1;
  }
</style>
