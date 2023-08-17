cd /home/opt/voting

lsof -i TCP:3333 | awk 'NR!=1 {print $2}' | xargs kill;
kill -9 $(ps aux | grep '\snext-router-worker' | awk '{print $2}')
nohup next start --port 3333 &> /home/opt/nohup.txt &