#!/bin/bash
ID="24580"
KEY="sCB2nJUZVMYLC2zN"

curl "https://api.songkick.com/api/3.0/metro_areas/${ID}/calendar.json?apikey=${KEY}" \
  --include \
  --request GET \

echo
