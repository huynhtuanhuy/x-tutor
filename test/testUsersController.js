import chai from 'chai';
import request from 'supertest';
import Server from '../server';


const { expect } = chai;


describe('Users', ()=>{
    it('should get all users', ()=> request(Server)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(r => {
            console.log(r.body);
            expect(r.body)
                .to.be.an.an('array')
        })
    )
});