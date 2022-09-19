class User{
    setFromJSON(json){
        this.username = json["username"];
        this.password = json["password"];
        this.email = json["email"];
        this.gender = json["gender"];
        this.countryId = json["country_id"];
        this.provinceId = json["province_id"];
        this.ageId = json["age_id"];
        this.statusId = json["status_id"];
        this.businessId = json["business_id"];
    }
}

export default User;