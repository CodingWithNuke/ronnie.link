<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        URL Shortener
      </v-toolbar-title>
    </v-app-bar>

    <v-main class="grey lighten-5">
      <v-container>
        <v-card outlined>
          <v-card-title>
            URLs
          </v-card-title>

          <v-card-text>
            <v-card outlined>
              <v-data-table
                :headers="urlHeaders"
                hide-default-footer
                :items="urls"
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn @click="onClickDeleteURL(item)" icon>
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                  <v-btn
                    target="_blank"
                    :href="`https://ronnie.link/${item.slug}`"
                    icon
                  >
                    <v-icon>
                      mdi-open-in-new
                    </v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-card-text>
        </v-card>
      </v-container>

      <DeleteUrlDialog v-model="deleteDialog.show" :item="deleteDialog.item" />

      <CreateUrlDialog>
        <template #activator="{on, attrs}">
          <v-btn
            v-on="on"
            v-bind="attrs"
            color="primary"
            fab
            fixed
            bottom
            right
          >
            <v-icon large>mdi-plus</v-icon>
          </v-btn>
        </template>
      </CreateUrlDialog>
    </v-main>
  </v-app>
</template>

<script>
import DeleteUrlDialog from "./components/DeleteUrlDialog.vue";
import CreateUrlDialog from "./components/CreateUrlDialog.vue";

export default {
  name: "App",

  components: {
    CreateUrlDialog,
    DeleteUrlDialog
  },

  data: () => ({
    urlHeaders: [
      {
        value: "_id",
        text: "ID"
      },
      {
        value: "url",
        text: "URL"
      },
      {
        value: "slug",
        text: "Slug"
      },
      {
        value: "actions",
        text: "Actions",
        sortable: false,
        align: "end"
      }
    ],
    deleteDialog: {
      show: false,
      item: {}
    }
  }),

  async beforeCreate() {
    await this.$store.dispatch("fetchUrls");
  },

  computed: {
    urls() {
      return this.$store.getters["urls"];
    }
  },

  methods: {
    async onClickDeleteURL(item) {
      this.deleteDialog = {
        show: true,
        item
      };
    }
  }
};
</script>
