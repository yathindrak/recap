<template>
    <div class="centerx">
        <vs-popup
                class="font"
                style="color:rgb(0,0,0)"
                background-color="rgba(255,255,255,.6)"
                :title="this.name" :active.sync="popupActivo5">

            <!--Description-->
            <h2>Description</h2><br/>

            <p>{{description}}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <br>
            </p>

            <div>
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
  props: ["name", "description", "bus", "type"],
  data() {
    return {
      colorx: "#4a5153",
      popupActivo5: false
    };
  },
  mounted() {
    this.bus.$on("confEdit", () => {
      this.popupActivo5 = true;
    });
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
</style>
