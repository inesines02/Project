from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
from joblib import load

loaded_model = joblib.load('all_models.pkl')


class PredictionInput(BaseModel):
    step: int
    amount: float
    oldbalanceOrg: float
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float
    dif_orig: float
    dif_des: float

app = FastAPI()




@app.post("/predict")
def make_prediction(input_data: PredictionInput):
   prediction = loaded_model.predict([[
        input_data.step,
        input_data.amount,
        input_data.oldbalanceOrg,
        input_data.newbalanceOrig,
        input_data.oldbalanceDest,
        input_data.newbalanceDest,
        input_data.dif_orig,
        input_data.dif_des,
    ]])
   return {"prediction": prediction}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)




# Configuration CORS
origins = [
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
