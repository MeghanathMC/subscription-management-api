import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "NSubscription ame is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },

    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },

    category: {
        type:String,
        required:true,
        enum:['sports','news','entertainment','tech','lifestyle',]
    },

    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "RUPEE"],
      default: "RUPEE",
    },

    frequency: {
      type: String,
      enum: ["daily", "monthly", "weekly", "yearly"],
    },

    paymentMethod:{
    type:String,
    required:true,
    trim:true
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default: 'active'
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator: (value) => value <= new Date(),
            message:"Start Date must be in the past"
        }
        ,
        renewalDate:{
            type:Date,
            validate:{
            validator: function (value){
                return value > this.startDate;
            },
            message:"Renewal date must be after the start date"
            }
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
            index:true
        }

    }

  },
  {
    timestamps: true,
  }
);


// auto calculate renewal date is missing
subscriptionSchema.pre('save', function(next){
    // if there is no renewal date , we can calculate the renewal date
 if(!this.renewalDate){
   const renewalPeriods = {
    daily:1,
    weekly:7,
    monthly:30,
    yearly:365
   }

   this.renewalDate = new Date(this.startDate);
   this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency] );
 }


// if the renewal date is in the past, set the status to expired
 if(new Date() > this.renewalDate){
    this.status='expired';
 }

 //proceed in the creation of document
 next();
})


export default subscription =  mongoose.model('Subscription',subscriptionSchema);