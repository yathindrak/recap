<template>
  <div class="centerx">
    <vs-popup
      class="font"
      style="color:rgb(0,0,0)"
      background-color="rgba(255,255,255,.6)"
      :title="this.name" :active.sync="popupActivo5">

      <!--Description-->
      <div v-if="!editable">
        <h2 @click="enableEditing">{{name}}</h2><br/>
      </div>
      <div v-if="editable">
        <vs-input :placeholder="name" v-on:keyup="changeTitle()" v-model="title"/><br>
      </div>

      <p @click="enableEditing()" v-if="!editable">{{description}}
        <br>
      </p>

      <textarea v-if="editable"
                id="descr"
                :value="description"
                name="subject"
                placeholder="Write something.."
                style="height:200px">
      </textarea>

      <!--<vs-input v-if="editable" :placeholder="description" v-model="description"/><br>-->
      <div id="edit-save" v-if="editable">
        <vs-button vs-color="success" vs-type="flat" vs-icon="comment" @click="saveEdit()">Save Changes</vs-button>
        <vs-button vs-color="success" vs-type="flat" vs-icon="cancel" @click="saveEdit()">Dismiss</vs-button>
      </div>
      <div v-bind:class="{ commentsSection: editable }" >
        <vs-list>
          <vs-list-header title="Comments" color="primary"></vs-list-header>
          <vs-list-item title="Anonymous" subtitle="Some comment">
            <template slot="avatar">
              <vs-avatar />
            </template>
          </vs-list-item>
          <vs-list-item title="Anonymous" subtitle="Some other comment">
            <template slot="avatar">
              <vs-avatar vs-text="Vuesax"/>
            </template>
          </vs-list-item>
        </vs-list>
        <vs-row>
          <vs-input vs-placeholder="Add Comment"/>
          <vs-button class="comment-submit-btn" vs-color="success" vs-type="flat" vs-icon="comment">Comment</vs-button>
        </vs-row>
      </div>

    </vs-popup>
  </div>
</template>

<script>
  export default {
    name: "EditCardModal",
    props: ["cardId", "name", "description", "bus", "type"],
    data() {
      return {
        title: '',
        boardId: this.$route.query.board_id,
        colorx: "#4a5153",
        popupActivo5: false,
        heading: "Description",
        editable: false
      };
    },
    mounted() {
      this.bus.$on("confEdit", () => {
        this.title = this.name;
        this.editable = false;
        this.popupActivo5 = true;
      });
    },
    methods: {
      openModal() {
        this.popupActivo5=true
      },
      changeTitle() {

      },
      enableEditing: function(){
        this.editable = true;
        // this.tempValue = this.value;
        // this.editing = true;
      },
      disableEditing: function(){
        this.editable = false;
        // this.tempValue = null;
        // this.editing = false;
      },
      saveEdit: function(){
        // However we want to save it to the database
        // this.value = this.tempValue;
        const descr = document.getElementById('descr').value;
        console.log(descr);
        this.$store.dispatch('updateCard', [parseInt(this.cardId), this.title, descr, this.boardId]);
        this.disableEditing();
      },
    }
  };
</script>

<style>
  .font {
    font-family: "Noto Sans", Arial, sans-serif !important;
  }
  .comment-submit-btn {
    transform: translateY(-20%);
  }
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }

  #edit-save{
    width: 100%;
    margin-top: 10px;
    margin-bottom: 50px;
  }

  #comments-heading {
    position: absolute;
    left: 0;
    margin-bottom: 100px;
  }

  .commentsSection {
    margin-top: 60px;
  }
</style>
