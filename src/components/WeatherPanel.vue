<template>
<v-card class="mr-2">
<v-list>
    <v-list-tile>
            <v-list-tile-content>
        <v-list-tile-title>
            Description
            </v-list-tile-title>
                {{ description }}
                </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
            <v-list-tile-content>
        <v-list-tile-title>
            Temperature
            </v-list-tile-title>
                {{ temp }}&deg; F
                </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
            <v-list-tile-content>
        <v-list-tile-title>
            Wind
            </v-list-tile-title>
                {{ wind.speed }}mph from {{ wind.direction }}
                </v-list-tile-content>
        </v-list-tile>
        </v-list>
</v-card>

</template>


<script>
import geometryConversion from "@/mixins/geometryConversion"
import {mapGetters} from "vuex"
export default {
    name: "WeatherPanel",
    mixins: [geometryConversion],
    computed: {
        ...mapGetters({
            currentWeather: "getCurrentWeather"
        }),
        temp() {
            return this.currentWeather.data.main.temp
        },
        wind() {
            return {
                degrees: this.currentWeather.data.wind.deg,
                direction: this.degToCardinalDirection(this.currentWeather.data.wind.deg),
                speed: this.currentWeather.data.wind.speed
            }
        },
        description() {
            return this.currentWeather.data.weather[0].main
        }

    }
}

</script>