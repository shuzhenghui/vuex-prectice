<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="inputVal" />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @click="changeCheck(item.id)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务数 -->
        <span>{{restUnDone}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button type="primary">全部</a-button>
          <a-button @click="unDone">未完成</a-button>
          <a-button>已完成</a-button>
        </a-button-group>
        <!-- 清除已完成 -->
        <a>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    ...mapActions(['getDataList']),
    ...mapMutations(['addItemToList', 'deleteItemFromList', 'changeCheckItem']),
    inputVal(e) {
      this.inputValue = e.target.value.trim()
    },
    addItem() {
      if (!this.inputValue) {
        return this.$message.warning('输入的任务不能为空!')
      }
      this.addItemToList(this.inputValue)
      this.inputValue = ''
    },
    deleteItem(id) {
      this.deleteItemFromList(id)
    },
    changeCheck(id) {
      this.changeCheckItem(id)
    },
    unDone() {
      console.log(123)
    }
  },
  computed: {
    ...mapState(['list']),
    ...mapGetters(['restUnDone'])
  },
  created() {
    console.log(navigator.userAgent)
    this.getDataList()
    // 在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem('store')) {
    //   console.log(JSON.parse(sessionStorage.getItem('store')))
    //   this.$store.replaceState(
    //     Object.assign(
    //       {},
    //       this.$store.state,
    //       JSON.parse(sessionStorage.getItem('store'))
    //     )
    //   )
    // }

    // // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // // beforeunload事件在页面刷新时先触发
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    // })
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.dt_list {
  width: 500px;
  margin-right: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
