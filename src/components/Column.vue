<template>
    <div>
    <vs-card class="column">
        <div slot="header">
            <!--<vs-button vs-color="success" vs-type="flat" vs-icon="dehaze"></vs-button>&lt;!&ndash;column options&ndash;&gt;-->

            <vs-row>
                <vs-dropdown>
                    <vs-button vs-color="success" class="btn-drop" vs-type="flat" vs-icon="dehaze"></vs-button>
                    <vs-dropdown-menu class="font">
                        <vs-dropdown-item>
                            Edit
                        </vs-dropdown-item>
                        <vs-dropdown-item>
                            delete
                        </vs-dropdown-item>
                    </vs-dropdown-menu>
                </vs-dropdown><!--End of column drop down -->
              <AddCardModal :columnId="columnId"></AddCardModal>
            </vs-row>


            <h3>
                {{this.name}}
            </h3>
            <h5>
                {{this.description}}
            </h5>
        </div>
        <div class="content">
            <slot />
        </div>
    </vs-card>
    </div>
</template>

<script>
import AddCardModal from "./AddCardModal";

export default {
  name: "Column",
  components: { AddCardModal },
  props: {
    columnId: '',
    name: String,
    description: String
  },
  data() {
    return {
      newcard: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.column {
  height: calc(100vh - 34px);
  flex: 0 0 auto;
  background-color: #f0f0f0;
  box-shadow: none;
  margin: 1em 1em;
  padding: 0.5em 1em 1.5em 1em;

  .content {
    height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .add-card {
    width: 70%;
  }
  .font {
    font-family: "Noto Sans", Arial, sans-serif !important;
  }
}
</style>
