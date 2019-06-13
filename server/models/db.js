global.db = {
	users : [
		{
	        id : 1 ,
	        email : 'bihames4vainqueur@gmail.com' ,
	        first_name : 'Bihame' ,
	        last_name : 'Vainqueur' ,
	        password : '$2b$10$KBI3hZ8aKqXiQPkQk0XPOeuaXY7r6QIO.EdJSylkdxgpFRFOuA4vq' ,
	        address : 'Kigali Kabeza' ,
	        is_admin : 1 
	    },
	    {
	        id : 2 ,
	        email : 'johndoe@gmail.com' ,
	        first_name : 'John' ,
	        last_name : 'Doe' ,
	        password : '$2b$10$KBI3hZ8aKqXiQPkQk0XPOeuaXY7r6QIO.EdJSylkdxgpFRFOuA4vq' ,
	        address : 'Annonymous City' ,
	        is_admin : 0
	    }
	],
	cars : [
		{
	        id : 1 ,
	        owner : 1,
	        created_on : new Date() ,
	        manufacturer : "Toyota" ,
	        model : "Mercedess Benz" ,
	        price : 80000.00 ,
	        state : "new" ,
	        status : "available" ,
	        body_type : "Car",
	        pictures : []
	    },
	    {
	        id : 2 ,
	        owner : 1,
	        created_on : new Date() ,
	        manufacturer : "Be Forward" ,
	        model : "Obama V8" ,
	        price : 150000.00 ,
	        state : "new" ,
	        status : "available" ,
	        body_type : "Car",
	        pictures : []
	    },
	    {
	        id : 3 ,
	        owner : 1,
	        created_on : new Date() ,
	        manufacturer : "Wintech Inc" ,
	        model : "X_TRAIL" ,
	        price : 150000.000 ,
	        state : "used" ,
	        status : "sold" ,
	        body_type : "Trailer",
	        pictures : []
	    }
	],
	orders : [
		{
	        id : 1 ,
	        buyer : 1,
	        car_id : 1 ,
	        amount : 150000.00 ,
	        status : "pending"
    	}
	],
	flags : [
		{
	        id : 1 ,
	        car_id : 1 ,
	        author : 1,
	        created_on : new Date() ,
	        reason : 'Pricing',
	        description : 'Pricing is really a very difficult problem here!'
    	}
	]
}


class dbModel{

	findbyField(field, model, fieldValue){
		return db[model].find(found => {
			return found[field] === fieldValue
		})
	}
	addItems(data, model){
		db[model] = [...db[model], data]
	}

}

export default new dbModel()