
function Particle(x = 0, y= 0, dx = 0, dy = 0, radius = 1, color) {
    this.position = new Vector(x, y);
    this.id = randIntBetween(1, 100000000);
    this.speed = new Vector(dx, dy);
    this.radius = radius;
    this.mass = radius;
    this.color = color;
    this.collidedParticle = undefined;

    this.draw = function() {
        c. beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();    
//        this.drawSpeedVector();
    }

    this.update = function() {
//        this.isOnEdge();
        this.position = this.position.add(this.speed);
    }

    // When fromParticle is false call is coming from outside the particles, so have to call the other particle we're colliding with
    this.collidedWith = function(particle) {
        this.collidedParticle = particle.copy();
    }

    this.processCollision = function() {
        // start by bouncing off a wall if necesary so velocity will be pointing in the right direction
        this.isOnEdge();

        // excerpt from http://www.gamasutra.com/view/feature/3015/pool_hall_lessons_fast_accurate_.php?page=3
        var p1 = this.position;
        var v1 = this.speed;
        var p2 = this.collidedParticle.position;
        var v2 = this.collidedParticle.speed;
        var m1 = this.mass;
        var m2 = this.collidedParticle.mass;

        // First, find the normalized vector n from the center of this particle to the center of the collided particle.
        var Un = p1.subtract(p2).normalize();
        // Now, find the unit tangent vector
        var Ut = new Vector(-Un.y, Un.x);

        // Project the velocity vectors onto the unit normal and unit tangent vectors.
        var v1n = Un.dot(v1);
        var v1t = Ut.dot(v1);
        var v2n = Un.dot(v2);
        var v2t = Ut.dot(v2);

        // Find the new tangential velocities (after the collision).
        var v1t_prime = v1t;
        var v2t_prime = v2t;

        // Find the new normal velocities (edited to remove mass from the equation)
        // var v1n_prime = (v1n * (m1 - m2) + 2 * m2 * v2n) / (m1 + m2);
        // var v2n_prime = (v2n * (m2 - m1) + 2 * m1 * v1n) / (m1 + m2);
        var v1n_prime = (2 * m2 * v2n) / (2);
        var v2n_prime = (2 * m1 * v1n) / (2);

        // Convert the scalar normal and tengential velocities into vectors
        var V1n_prime = Un.multiply(v1n_prime);
        var V1t_prime = Ut.multiply(v1t_prime);

        // Find the final velcodity vector by adding the normal and tangential components
        this.speed = V1n_prime.add(V1t_prime);

    }

    this.overlapsParticle = function(particle) {
        var loc = particle.location;
        var dist = this.position.distance(loc);
        return (dist <= this.radius + particle.radius); 
    }

    this.drawSpeedVector = function() {
        var endPoint = this.speed.multiply(20);
        var endPoint = endPoint.add(this.position);
        c.beginPath();
        c.moveTo(this.position.x, this.position.y);
        c.lineTo(endPoint.x, endPoint.y);
        c.stroke();        
    }

    this.copy = function() {
        var x = this.position.x;
        var y = this.position.y;
        var dx = this.speed.x;
        var dy = this.speed.y;
        var radius = radius;
        var color = color;
        var returnParticle = new Particle(x, y, dx, dy, radius, color);
        returnParticle.id = this.id;
        return returnParticle;
    }

    this.amBreaking = function() {
        this.amBoundWith = nullParticle;
    }

    this.isOnEdge = function() {
        var result = false;
        if (this.position.x >= window.innerWidth - this.radius) {
            this.speed.x = -this.speed.x;
            this.position.x += this.speed.x;
            result = true;
        }
        if (this.position.x <= this.radius) {
            this.speed.x = -this.speed.x;
            this.position.x += this.speed.x;
            result = true;
        }
        if (this.position.y >= window.innerHeight - this.radius) {
            this.speed.y = -this.speed.y;
            this.position.y += this.speed.y;
            result = true;
        } 
        if (this.position.y <= this.radius) {
            this.speed.y = -this.speed.y;
            this.position.y += this.speed.y;
            result = true;
        }
    return result;
    }

}

