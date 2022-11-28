<template>
  <div class="row">
    <div class="col bible">
      <div class="soap-form">
        <!-- Scripture -->
        <div class="card bg-dark shadow-custom example-soap overflow-auto">
          <div class="card-body">
            <h5 class="card-title">Scripture</h5>
            <p class="card-text text-center">
              <ol>
                <li>
                  Once you were dead because of your disobedience and your many sins.
                </li>
                <li>
                  You used to live in sin, just like the rest of the world, obeying the devil—the commander of the powers in the unseen world. He is the spirit at work in the hearts of those who refuse to obey God.
                </li>
                <li>
                  All of us used to live that way, following the passionate desires and inclinations of our sinful nature. By our very nature we were subject to God's anger, just like everyone else.
                </li>
                <li>
                  But God is so rich in mercy, and he loved us so much,
                </li>
                <li>
                  that even though we were dead because of our sins, he gave us life when he raised Christ from the dead. (It is only by God's grace that you have been saved!)
                </li>
                <li>
                  For he raised us from the dead along with Christ and seated us with him in the heavenly realms because we are united with Christ Jesus.
                </li>
                <li>
                  So God can point to us in all future ages as examples of the incredible wealth of his grace and kindness toward us, as shown in all he has done for us who are united with Christ Jesus.
                </li>
                <li>
                  God saved you by his grace when you believed. And you can't take credit for this; it is a gift from God.
                </li>
                <li>
                  Salvation is not a reward for the good things we have done, so none of us can boast about it.
                </li>
                <li>
                  For we are God's masterpiece. He has created us anew in Christ Jesus, so we can do the good things he planned for us long ago.
                </li>
              </ol>
              Ephesians 2:1-10 NLT
            </p>
          </div>
        </div>

        <!-- Observation -->
        <div class="card bg-dark mt-3 shadow-custom example-soap overflow-auto">
          <div class="card-body">
            <h5 class="card-title">Observation</h5>
            <p class="card-text">
              <ul>
                <li>
                  This is a letter written by the apostle Paul and directed to God's holy people in Ephesus. Written around AD 60-61
                </li>
                <li>
                  Once dead while living in sin.
                </li>
                <li>
                  Devil is responsible for all sin and lives within those who don't obey God.
                </li>
                <li>
                  Every one of us lived for the world and were subject to God's anger.
                </li>
                <li>
                  God loved us even when we lived a life of sin for, he raised Christ from the grave. He also raised us from the death of sin.
                </li>
                <li>
                  We are examples of God's grace and kindness.
                </li>
                <li>
                  We are God's creation and each and every one of us has a purpose that was planned before we walked this earth.
                </li>
              </ul>
            </p>
          </div>
        </div>

        <!-- Application -->
        <div class="card bg-dark mt-3 shadow-custom example-soap overflow-auto">
          <div class="card-body">
            <h5 class="card-title">Application</h5>
            <p class="card-text">
              To honor the grace freely given to me I can show others that same love and grace. Through my actions towards others, I praise my creator. By extending that same love, kindness and grace to everyone I encounter, I would feel better and be less bothered by worldly desire as I am living within the plan set forth by God.
            </p>
          </div>
        </div>

        <!-- Prayer -->
        <div class="card bg-dark mt-3 shadow-custom example-soap overflow-auto">
          <div class="card-body">
            <h5 class="card-title">Prayer</h5>
            <p class="card-text">
              Heavenly Father please guide me as I walk with you and try love everyone as you do. Protect me from worldly desire. As I continue to live my life in your honor guide me along the path you have already set for me. I surrender to you and ask for your assistance as I battle with sin every day. Forgive me for all that I've done wrong, and I will forgive all those who have wronged me. Give me the strength to resist temptation and overcome all worldly problems I may face. I ask for the Holy Spirit within me to aide me when I anger and remind me to show love. In your name I pray. Amen
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="col soap">
      <SOAPForm class="soap-form" />
    </div>
  </div>
</template>

<script>
import IFrame from "@/components/IFrame.vue";
import SOAPForm from "../components/SOAPForm.vue";
export default {
  name: "About",
  created() {
    document.title = "The SOAP Dish - About";
  },
  data() {
    return {};
  },
  components: {
    IFrame,
    SOAPForm,
  },
  methods: {},
};
</script>

<style scoped>
.bible-embed {
  height: 95vh;
  text-align: center;
  width: 95%;
  /* margin: 10px; */
  margin-left: 20px;
  border: 1px solid #111;
  border-radius: 8px;
  box-shadow: #111;
}

.soap-form {
  width: 95%;
  margin-left: 20px;
}
.shadow-custom {
  border: 1px solid #000;
  box-shadow: 5px 5px 10px #111;
}
.example-soap {
  height: 200px;
}
</style>
