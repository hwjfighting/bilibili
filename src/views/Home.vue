<template>
  <div class="home" v-if="category">
    <nav-bar></nav-bar>
    <div class="categorytab">
      <div class="category-ico" @click="$router.push('/editcategory')"><van-icon name="setting-o" /></div>
      <van-tabs v-model="active" swipeable sticky animated>
        <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
          <van-list
            v-model="item.loading"
            :immediate-check="false"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad"
          >
            <div class="detailparent">
              <cover
                class="detailitem"
                :detailitem="categoryitem"
                v-for="(categoryitem,categoryindex) in item.list"
                :key="categoryindex"
              />
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/common/Navbar.vue";
import cover from "./cover.vue";
export default {
  data() {
    return {
      category: [],//所有导航标签，及各标签下的信息
      active: 0
    };
  },
  components: {
    NavBar,
    cover
  },
  activated() {
    // 如果本地存储有栏目 则 渲染本地自定义栏目
    if(localStorage.getItem('newCat')) {
        let newCat = JSON.parse(localStorage.getItem('newCat'))
        this.category = this.changeCategory(newCat)
        this.selectArticle();
        console.log('123')
    }
  },
  methods: {
    //获取导航栏里的标签及活跃标签下的视频
    async selectCategory() {
      
      if(localStorage.getItem('newCat')) {
        return
      }
      const res = await this.$http.get("/category");
      // console.log(res)
      //调用changeCategory给category.data下数组中的每一项都添加属性
      this.category = this.changeCategory(res.data);
      this.selectArticle();
      // console.log('123')
    },
    //改造category内的信息，增加属性
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        //在item中增加属性
        item.list = [];
        item.page = 0;
        item.finished = false;
        item.loading = true;
        item.pagesize = 10;
        return item;
      });
      return category1;
    },
    //根据请求参数获取视频
    async selectArticle() {
      const categoryitem = this.categoryItem();
      // console.log(categoryitem);
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      });
      categoryitem.list.push(...res.data);
      categoryitem.loading = false;
      if (res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true;
      }
    },
    onLoad() {
      const categoryitem = this.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.selectArticle();
      }, 1000);
    },
    //获取活跃标签下的视频内容
    categoryItem() {
      const categoryitem = this.category[this.active];
      return categoryitem;
    }
  },
  watch: {
    //监听active变量的更改
    active() {
      const categoryitem = this.categoryItem();
      if (!categoryitem.list.length) {
        this.selectArticle();
      }
    }
  },
  created() {
    this.selectCategory();
  }
};
</script>
<style lang="less">
.home {
  background-color: white;
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
.categorytab{
  position: relative;
  .category-ico{
    position: absolute;
    z-index: 5;
    right: 0;
    top: 1.944vw;
    padding: 1.389vw 2.778vw;
    background-color: white;
  }
}

</style>