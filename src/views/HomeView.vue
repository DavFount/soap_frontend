<template>
  <main class="main">
    <div class="maindiv"></div>
    <DarkHero title="Welcome to The SOAP Dish">
      The SOAP method encourages a deeper dive into scripture than simply
      reading God's word. SOAP is an acronym which means Scripture, Observation,
      Application, Prayer.
    </DarkHero>
    <HeroDivider />
    <DarkHero title="Why SOAP?">
      Spending time with God is the only way to truly become closer to Him. To
      read His words and to live by those words means you must understand what
      is being said. The SOAP method encourages that deeper dive into the word
      by slowing you down and allows you to digest and understand what is being
      said. SOAP can take as little as 15 minutes or as long as you need. We
      provide a toolkit to aid in your study of the Bible. You can share your
      studies with others and help spread the word to those who may not yet be
      saved.
    </DarkHero>
    <HeroDivider />
    <DarkHero title="What is SOAP?">
      <p class="sub-header">S - Scripture</p>
      <p class="description">Write down your verse</p>
      <p class="body">
        The Holy Spirit works wonders for us every day. By writing the word it
        will help you memorize scripture and reveal more to you than simply
        reading it.
      </p>

      <p class="sub-header">O - Observation</p>
      <p class="description">What jumps out at you during your reading?</p>
      <p class="body">
        Try to figure out the who, what, where and when during your reading.
        Pull out words that repeat.
      </p>

      <p class="sub-header">A - APPLICATION</p>
      <p class="description">
        How can you apply the verses to your life? Make it personal!
      </p>
      <p class="body">
        What is God telling me? How can I use the lessons througout my life?
        What changes can I make to truly live as the word describes? What would
        my life look like? How can I use this to show others true and
        unconditional love and Grace?
      </p>

      <p class="sub-header">P - PRAYER</p>
      <p class="description">Pray over God's words</p>
      <p class="body">
        Pray about what was revealed to you during this time. Confess any sins
        that may have been revealed during your study. Take the time to thank
        Him for his persistence to get to know you and all the blessings in your
        life.
      </p>
    </DarkHero>
    <HeroDivider :lastItem="true" />
  </main>
</template>

<script>
import api from "@/api";
import DarkHero from "@/components/DarkHero.vue";
import HeroDivider from "@/components/HeroDivider.vue";
import SocketTest from "@/components/SocketTest.vue";

export default {
  name: "App",
  created() {
    document.title = "The SOAP Dish - Home";
  },
  data() {
    return {};
  },
  components: {
    DarkHero,
    HeroDivider,
    SocketTest,
  },
  methods: {},
};
</script>

<style scoped>
.maindiv {
  margin-left: 3rem;
}

.sub-header {
  font-size: 24px;
  font-weight: bold;
  color: #d89a2e80;
}

.description {
  font-style: italic;
  font-size: 20px;
}

.body {
  font-size: 18px;
}
</style>
